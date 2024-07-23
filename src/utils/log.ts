const projectName = import.meta.env.VITE_GLOB_APP_TITLE;

export function warn(message){
  console.warn(`[${projectName} warn]:${message}`);
}

export function error(message){
  console.error(`[${projectName} error]:${message}`);
}