import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Bot, SendHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ChatRole = 'assistant' | 'user';

type AgentModel = 'qwen3:8b' | 'gpt4' | 'claude2' | 'custom';

interface ChatMessageItem {
  role: ChatRole;
  content: string;
}


// {
//   "model": "qwen3",
//   "messages": [
//     { "role": "user", "content": "你好，介绍一下你自己" }
//   ],
//   "stream": false
// }

interface ChatMessage {
  model: AgentModel;
  stream: boolean;
  messages: ChatMessageItem[];
}

interface DisplayMessage {
  id: number;
  role: ChatRole;
  content: string;
  thinking?: string;
}

interface ChatApiResponse {
  model?: string;
  created_at?: string;
  message?: {
    role?: ChatRole | string;
    content?: string;
    thinking?: string;
  };
  done?: boolean;
  done_reason?: string;
}

const CHAT_API_URL = 'https://polished-glade-299f.yangbo920210.workers.dev/api/chat';

const normalizeText = (value: unknown): string | null => {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  if (Array.isArray(value)) {
    const joined = value
      .map((item) => (typeof item === 'string' ? item : ''))
      .join('')
      .trim();

    return joined.length > 0 ? joined : null;
  }

  return null;
};

const extractAssistantData = (
  payload: unknown
): { content: string | null } => {
  // 优先匹配当前接口格式：{ message: { content, thinking } }
  if (payload && typeof payload === 'object') {
    const apiData = payload as ChatApiResponse;
    const messageContent = normalizeText(apiData.message?.content);

    if (messageContent) return { content: messageContent };
  }

  const direct = normalizeText(payload);
  if (direct) return { content: direct };

  if (!payload || typeof payload !== 'object') {
    return { content: null };
  }

  const data = payload as Record<string, unknown>;
  const primaryKeys = ['reply', 'answer', 'content', 'text', 'response', 'result'];

  for (const key of primaryKeys) {
    const value = data[key];
    const normalized = normalizeText(value);
    if (normalized) return { content: normalized };
  }

  const choices = data.choices;
  if (Array.isArray(choices) && choices.length > 0) {
    const firstChoice = choices[0];
    if (firstChoice && typeof firstChoice === 'object') {
      const choiceRecord = firstChoice as Record<string, unknown>;
      const fromMessage = choiceRecord.message;
      if (fromMessage && typeof fromMessage === 'object') {
        const msgText = normalizeText((fromMessage as Record<string, unknown>).content);
        if (msgText) return { content: msgText };
      }

      const fromText = normalizeText(choiceRecord.text);
      if (fromText) return { content: fromText };
    }
  }

  const nestedData = data.data;
  if (nestedData && typeof nestedData === 'object') {
    const nestedReply = extractAssistantData(nestedData);
    if (nestedReply.content) return nestedReply;
  }

  return { content: null };
};

const extractThinkingText = (payload: unknown): string | null => {
  if (payload && typeof payload === 'object') {
    const apiData = payload as ChatApiResponse;
    return normalizeText(apiData.message?.thinking);
  }

  return null;
};

const extractStreamLine = (line: string): unknown | null => {
  const trimmed = line.trim();
  if (!trimmed) return null;

  const normalized = trimmed.startsWith('data:') ? trimmed.slice(5).trim() : trimmed;
  if (!normalized || normalized === '[DONE]') return null;

  try {
    return JSON.parse(normalized) as unknown;
  } catch {
    return null;
  }
};

const mergeStreamText = (current: string, incoming: string): string => {
  if (!incoming) return current;
  if (!current) return incoming;
  if (incoming.startsWith(current)) return incoming;
  if (current.startsWith(incoming)) return current;
  return current + incoming;
};

const AiChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<DisplayMessage[]>([
    {
      id: Date.now(),
      role: 'assistant',
      content: '你好，我是 Cozy Bake AI 助手。你可以问我食谱、烘焙技巧或替代食材建议。',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasStreamStarted, setHasStreamStarted] = useState(false);
  const nextIdRef = useRef(Date.now() + 1);
  const listEndRef = useRef<HTMLDivElement | null>(null);
  const messageListRef = useRef<HTMLDivElement | null>(null);
  const renderTimerRef = useRef<number | null>(null);
  const thinkingContainerRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  useEffect(() => {
    if (messageListRef.current) {
      if (isLoading) {
        // 流式阶段持续贴底，避免“还在思考但页面不动”
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      } else {
        listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (!thinkingContainerRef.current) return;
    thinkingContainerRef.current.scrollTop = thinkingContainerRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    return () => {
      if (renderTimerRef.current !== null) {
        window.clearInterval(renderTimerRef.current);
      }
    };
  }, []);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: DisplayMessage = {
      id: nextIdRef.current++,
      role: 'user',
      content: trimmedInput,
    };

    const assistantMessageId = nextIdRef.current++;
    const assistantMessage: DisplayMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput('');
    setIsLoading(true);
    setHasStreamStarted(false);
    if (renderTimerRef.current !== null) {
      window.clearInterval(renderTimerRef.current);
      renderTimerRef.current = null;
    }

    try {
      const payload: ChatMessage = {
        model: 'qwen3:8b',
        stream: true,
        messages: [{ role: 'user', content: trimmedInput }],
      };

      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const updateAssistantMessage = (updater: (prev: string) => string) => {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantMessageId
              ? { ...message, content: updater(message.content) }
              : message
          )
        );
      };

      const updateAssistantThinking = (updater: (prev: string) => string) => {
        setMessages((prev) =>
          prev.map((message) => {
            if (message.id !== assistantMessageId) return message;
            const currentThinking = message.thinking ?? '';
            return { ...message, thinking: updater(currentThinking) };
          })
        );
      };

      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let accumulated = '';
        let accumulatedThinking = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            const parsedLine = extractStreamLine(line);
            if (!parsedLine) continue;

            const parsedChunk = extractAssistantData(parsedLine);
            const thinkingChunk = extractThinkingText(parsedLine);
            if (thinkingChunk) {
              setHasStreamStarted(true);
              accumulatedThinking = mergeStreamText(accumulatedThinking, thinkingChunk);
              updateAssistantThinking(() => accumulatedThinking);
            }

            if (!parsedChunk.content) continue;

            setHasStreamStarted(true);
            accumulated = mergeStreamText(accumulated, parsedChunk.content);
          }
        }

        const finalLine = extractStreamLine(buffer);
        if (finalLine) {
          const parsedChunk = extractAssistantData(finalLine);
          const thinkingChunk = extractThinkingText(finalLine);
          if (thinkingChunk) {
            setHasStreamStarted(true);
            accumulatedThinking = mergeStreamText(accumulatedThinking, thinkingChunk);
            updateAssistantThinking(() => accumulatedThinking);
          }

          if (parsedChunk.content) {
            setHasStreamStarted(true);
            accumulated = mergeStreamText(accumulated, parsedChunk.content);
          }
        }

        if (accumulated.trim()) {
          // 正文完整返回后，移除 thinking 并快速逐步渲染正文
          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantMessageId ? { ...message, content: '', thinking: '' } : message
            )
          );

          let cursor = 0;
          const step = 6;
          renderTimerRef.current = window.setInterval(() => {
            cursor = Math.min(cursor + step, accumulated.length);
            const nextText = accumulated.slice(0, cursor);

            setMessages((prev) =>
              prev.map((message) =>
                message.id === assistantMessageId ? { ...message, content: nextText } : message
              )
            );

            if (cursor >= accumulated.length && renderTimerRef.current !== null) {
              window.clearInterval(renderTimerRef.current);
              renderTimerRef.current = null;
            }
          }, 12);
        } else {
          updateAssistantMessage(() => '接口已返回，但未拿到可展示的文本内容。');
        }
      } else {
        const contentType = response.headers.get('content-type') ?? '';
        let replyText = '';

        if (contentType.includes('application/json')) {
          const json: unknown = await response.json();
          const parsed = extractAssistantData(json);
          replyText = parsed.content ?? '';
        } else {
          replyText = (await response.text()).trim();
        }

        updateAssistantMessage(() => replyText || '接口已返回，但未拿到可展示的文本内容。');
      }
    } catch (error) {
      const err = error instanceof Error ? error.message : 'Unknown error';
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantMessageId
            ? { ...message, thinking: '', content: `请求失败：${err}` }
            : message
        )
      );
    } finally {
      setIsLoading(false);
      setHasStreamStarted(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void sendMessage();
  };

  return (
    <div className="bg-secondary-light min-h-screen flex flex-col">
      <div className="bg-white px-6 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
            <Bot size={20} className="text-primary-dark" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">AI Assistant</h1>
            <p className="text-xs text-gray-500">Powered by Cozy Bake</p>
          </div>
        </div>
      </div>

      <div ref={messageListRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((message) => {
          const isUser = message.role === 'user';

          return (
            <div
              key={message.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-[85%] space-y-2">
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm whitespace-pre-wrap ${
                    isUser
                      ? 'bg-primary text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md'
                  } ${!isUser && !message.content && message.thinking ? 'hidden' : ''}`}
                >
                  {message.content}
                </div>

                {!isUser && message.thinking && (
                  <div
                    ref={thinkingContainerRef}
                    className="rounded-2xl rounded-bl-md px-4 py-3 text-xs leading-5 shadow-sm border border-gray-200 bg-gray-50 text-gray-500 whitespace-pre-wrap break-all max-h-36 overflow-y-auto scrollbar-hide"
                  >
                    <p className="font-medium text-gray-400 mb-1">Thinking...</p>
                    {message.thinking}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && !hasStreamStarted && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-500 rounded-2xl rounded-bl-md px-4 py-3 text-sm shadow-sm flex items-center gap-2">
              <span>AI 正在思考</span>
              <span className="inline-flex items-center gap-1" aria-hidden="true">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: '120ms' }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: '240ms' }}
                />
              </span>
            </div>
          </div>
        )}

        <div ref={listEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入你想问的问题..."
            className="flex-1 px-4 py-3 rounded-xl bg-gray-100 border border-transparent
                       focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!canSend}
            className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center
                       disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
            aria-label="Send"
          >
            <SendHorizontal size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiChatPage;
