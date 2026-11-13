import { settle, until } from '../../../../tools/node/viz-testkit.mjs';

// An embedded solid creates its first WebGL context only after entering the viewport.
// Before that parked() is also true, so the rest checks must first witness a context.
export function withReadySolid(T) {
  const ready = Object.create(T);
  ready.open = async (...args) => {
    const page = await T.open(...args);
    if (!/embed=1/.test(args[2] || '')) return page;
    await settle(page);
    T.check('solid (embed): the card on screen creates its first WebGL context before the rest checks',
      await until(page, () => window.TRV.solids && window.TRV.solids[0] && window.TRV.solids[0].contexts > 0, null, 120000));
    return page;
  };
  return ready;
}
