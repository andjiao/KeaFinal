import fs from "fs";

const nav = fs.readFileSync("./public/components/nav/nav.html", "utf-8");


export function renderPage(path, options = {}) {  
    const page = fs.readFileSync("./public/pages"+path).toString(); 

    return page
        .replace("%%PAGE_CSS_LINK%%", options.cssLink || "") 
        .replace("%%TAB_TITLE%%", options.tabTitle || "") 
        .replace("%%PAGE_SCRIPT_LINK%%", options.scriptLink || "") 
} 

