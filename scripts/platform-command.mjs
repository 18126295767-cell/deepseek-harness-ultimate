export function commandInvocation(name, platform = process.platform, env = process.env) {
  if (platform === 'win32') {
    return {
      command: env.ComSpec || env.COMSPEC || 'cmd.exe',
      argsPrefix: ['/d', '/s', '/c', name],
    };
  }
  return { command: name, argsPrefix: [] };
}

export const npmInvocation = (platform = process.platform, env = process.env) => commandInvocation('npm', platform, env);
export const npxInvocation = (platform = process.platform, env = process.env) => commandInvocation('npx', platform, env);
