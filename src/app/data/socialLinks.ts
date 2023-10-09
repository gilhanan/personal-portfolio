import { FiFacebook, FiGithub, FiLinkedin } from "react-icons/fi";
import { SocialLink } from "@shared/models";

export const socialLinks: SocialLink[] = [
  {
    icon: FiGithub,
    url: "https://github.com/gilhanan",
    ariaLabel: "My Github profile",
  },
  {
    icon: FiLinkedin,
    url: "https://www.linkedin.com/in/gil-hanan-b9892376",
    ariaLabel: "My Linkedin profile",
  },
  {
    icon: FiFacebook,
    url: "https://www.facebook.com/gil.hanan",
    ariaLabel: "My Facebook profile",
  },
];
