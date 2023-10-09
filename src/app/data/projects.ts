import { Project } from "@shared/models";
import light from "@images/projects/chat-gpt-rtl.svg";
import dark from "@images/projects/chat-gpt-rtl-dark.svg";

export const projects: Project[] = [
  {
    title: "ChatGPT RTL",
    url: "https://chrome.google.com/webstore/detail/chatgpt-rtl/nabcbpmmefiigmjpopfciegmlgihkofd ",
    category: "Chrome Extension",
    repo: "https://github.com/gilhanan/chat-gpt-rtl",
    images: {
      light,
      dark,
    },
  },
];
