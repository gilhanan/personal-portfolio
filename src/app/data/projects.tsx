import { Project } from "@shared/models";
import chatGptRtlLight from "@images/projects/chat-gpt-rtl.svg";
import chatGptRtlDark from "@images/projects/chat-gpt-rtl-dark.svg";
import claudeRtlLight from "@images/projects/claude-rtl.svg";
import claudeRtlDark from "@images/projects/claude-rtl-dark.svg";
import lighthouseAzureLight from "@images/projects/lighthouse-ci-azure.svg";
import lighthouseAzureDark from "@images/projects/lighthouse-ci-azure-dark.svg";

export const projects: Project[] = [
  {
    id: "chat-gpt-rtl",
    title: "ChatGPT RTL",
    url: "https://chrome.google.com/webstore/detail/chatgpt-rtl/nabcbpmmefiigmjpopfciegmlgihkofd",
    category: "Chrome Extension",
    repo: "https://github.com/gilhanan/rtl-extensions/tree/main/extensions/chatgpt",
    images: {
      light: chatGptRtlLight,
      dark: chatGptRtlDark,
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
  {
    id: "claude-rtl",
    title: "Claude RTL",
    url: "https://chrome.google.com/webstore/detail/claude-rtl/bogboalkhfnponhdoflinneddblhdfma",
    category: "Chrome Extension",
    repo: "https://github.com/gilhanan/rtl-extensions/tree/main/extensions/claude",
    images: {
      light: claudeRtlLight,
      dark: claudeRtlDark,
    },
    description: (
      <div className="flex flex-col gap-4">
        <div>
          <p>
            Claude auto right-to-left alignments for Arabic, Persian, Hebrew,
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
              <span>Open Claude discussion.</span>
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
  {
    id: "lhci-azure",
    title: "Lighthouse CI on Azure",
    url: "https://gh-lhci-azure-lhci-server.agreeablebay-71c2bcb8.northeurope.azurecontainerapps.io/app/projects/gh-lhci-azure",
    category: "Web development",
    repo: "https://github.com/gilhanan/lhci-azure",
    images: {
      light: lighthouseAzureLight,
      dark: lighthouseAzureDark,
    },
    description: (
      <div className="flex flex-col gap-4">
        <div>
          <p>
            This solution provides continuous integration and deployment
            processes using GitHub workflow to create and maintain a Lighthouse
            CI solution hosted on Microsoft&apos;s Azure platform.
          </p>
          <p>
            This solution also provides a demo Web application so the Lighthouse
            would able to run the audits on it.
          </p>
        </div>
        <div>
          <h2 className="text-lg text-primary">Main Components</h2>
          <div className="grid grid-cols-[auto,1fr] gap-2">
            <b>Demo Web Application:</b>
            <span>
              Web application that is used to run the Lighthouse audits on it.
            </span>
            <b>Lighthouse CI Client:</b>
            <span>
              Responsible for running the Lighthouse audits on the demo Web
              application.
            </span>
            <b>Lighthouse CI Server:</b>
            <span>
              Responsible for storing the Lighthouse audits reports, and
              providing a web interface for viewing the reports.
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-lg text-primary">Hight Level Architecture</h2>
          <p>
            On every push to the <code>main</code> branch, the GitHub Actions
            workflow will run the following steps:
          </p>
          <ol>
            <li className="flex gap-1">
              <span>1️⃣</span>
              <span>Deploy the demo Web application to a staging slot.</span>
            </li>
            <li className="flex gap-1">
              <span>2️⃣</span>
              <span>
                Run the Lighthouse audits on the staging slot and store the
                reports in the Lighthouse CI Server.
              </span>
            </li>
            <li className="flex gap-1">
              <span>3️⃣</span>
              <span>
                If the audits passed, swap the demo Web application&apos;s
                staging slot with the production slot.
              </span>
            </li>
          </ol>
        </div>
      </div>
    ),
  },
];
