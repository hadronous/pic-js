import { resolve } from 'node:path';
import { PocketIc } from '@dintegral/pocketic';
import { CounterActor, idlFactory, CounterService } from '../counter';

const WASM_PATH = resolve(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  '.dfx',
  'local',
  'canisters',
  'counter',
  'counter.wasm',
);

describe('Counter', () => {
  let pic: PocketIc;
  let actor: CounterActor;

  beforeEach(async () => {
    pic = await PocketIc.create();
    const fixture = await pic.setupCanister<CounterService>(
      idlFactory,
      WASM_PATH,
    );
    actor = fixture.actor;
  });

  afterEach(async () => {
    await pic.tearDown();
  });

  it('should start at 0', async () => {
    const result = await actor.get();

    expect(result).toEqual(0n);
  });

  it.each([42n, 306n, 7n])('should set the counter to %d', async input => {
    await actor.set(input);
    const result = await actor.get();

    expect(result).toEqual(input);
  });

  it('should increment from 0', async () => {
    const initialCount = await actor.get();

    await actor.inc();
    const countAfterFirstInc = await actor.get();

    await actor.inc();
    const finalCount = await actor.get();

    expect(initialCount).toEqual(0n);
    expect(countAfterFirstInc).toEqual(1n);
    expect(finalCount).toEqual(2n);
  });

  it.each([42n, 306n, 7n])('should increment from %d', async input => {
    await actor.set(input);
    const initialCount = await actor.get();

    await actor.inc();
    const countAfterFirstInc = await actor.get();

    await actor.inc();
    const finalCount = await actor.get();

    expect(initialCount).toEqual(input);
    expect(countAfterFirstInc).toEqual(input + 1n);
    expect(finalCount).toEqual(input + 2n);
  });

  it.each([42n, 306n, 7n])('should decrement from %d', async input => {
    await actor.set(input);
    const initialCount = await actor.get();

    await actor.dec();
    const countAfterFirstDec = await actor.get();

    await actor.dec();
    const finalCount = await actor.get();

    expect(initialCount).toEqual(input);
    expect(countAfterFirstDec).toEqual(input - 1n);
    expect(finalCount).toEqual(input - 2n);
  });

  it('should fail to decrement from 0', async () => {
    const initialCount = await actor.get();

    expect(initialCount).toEqual(0n);
    await expect(actor.dec()).rejects.toThrow('Natural subtraction underflow');
  });
});
