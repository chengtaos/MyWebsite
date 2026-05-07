export interface Project {
  title: string;
  description: string;
  link: string;
  status: "online" | "wip";
}

export const projects: Project[] = [
  {
    title: "What2EatToday",
    description: "今天吃什么？一个帮你解决日常选择困难的小工具。",
    link: "https://github.com/chengtaos/What2EaToday",
    status: "online",
  },
];
