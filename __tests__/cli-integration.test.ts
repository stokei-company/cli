import { system, filesystem } from 'gluegun';

const src = filesystem.path(__dirname, '..');

const cli = async (cmd) =>
  system.run('node ' + filesystem.path(src, 'bin', 'stokeicli') + ` ${cmd}`);

describe('StokeiCLI', () => {
  it('outputs version', async () => {
    const output = await cli('--version');
    expect(output).toContain('1.0.0');
  });

  it('outputs help', async () => {
    const output = await cli('--help');
    expect(output).toContain('1.0.0');
  });
});
