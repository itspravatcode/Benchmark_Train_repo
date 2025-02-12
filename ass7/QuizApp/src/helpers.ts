export function decodeHTML(html: string): string {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  }
  
  export function shuffle(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }
  