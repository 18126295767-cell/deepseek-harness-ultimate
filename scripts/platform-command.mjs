export function npmInvocation(platform = process.platform, env = process.env) {
  if (platform === 'win32') {
    return {
      command: env.ComSpec || env.COMSPEC || 'cmd.exe',
      argsPrefix: ['/d', '/s', '/c', 'npm'],
    };
  }
  return { command: 'npm', argsPrefix: [] };
}
