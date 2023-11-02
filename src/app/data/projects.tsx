import { Project } from "@shared/models";
import light from "@images/projects/chat-gpt-rtl.svg";
import dark from "@images/projects/chat-gpt-rtl-dark.svg";

export const projects: Project[] = [
  {
    id: "chat-gpt-rtl",
    title: "ChatGPT RTL",
    url: "https://chrome.google.com/webstore/detail/chatgpt-rtl/nabcbpmmefiigmjpopfciegmlgihkofd",
    category: "Chrome Extension",
    repo: "https://github.com/gilhanan/chat-gpt-rtl",
    images: {
      light,
      dark,
    },
    description: (
      <div className="flex flex-col gap-4">
        <div>
          <p>
            ChatGPT auto right-to-left alignments for Arabic, Persian, Hebrew,
            and more.
          </p>
          <p>
            An open-source plugin that automatically identifies right-to-left
            paragraphs and adjusts and arranges the text in real-time.
          </p>
        </div>
        <div>
          <h2 className="text-lg text-primary">⭐️ Features ⭐️</h2>
          <ul>
            <li className="flex gap-1">
              <span>📝</span>
              <span>
                Automatically identifies RTL paragraphs and adjusts the
                direction in real-time.
              </span>
            </li>
            <li className="flex gap-1">
              <span>⚙️</span>
              <span>
                User-friendly settings popup for configuring the enabling
                functionality.
              </span>
            </li>
            <li className="flex gap-1">
              <span>🌍</span>
              <span>
                Supports the following RTL languages: Arabic, Persian, Hebrew,
                and more.
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg text-primary">💡 How to use 💡</h2>
          <ol>
            <li className="flex gap-1">
              <span>1️⃣</span>
              <span>Install this extension.</span>
            </li>
            <li className="flex gap-1">
              <span>2️⃣</span>
              <span>Open ChatGPT discussion.</span>
            </li>
            <li className="flex gap-1">
              <span>3️⃣</span>
              <span>Enjoy chatting with RTL support!</span>
            </li>
          </ol>
        </div>
        <p>Enjoy! 🙏</p>
      </div>
    ),
  },
];
