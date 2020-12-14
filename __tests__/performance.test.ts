import Benchmark from 'benchmark';
import { some, fold } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/function'
import { Option } from '../src';

describe('Performance Tests', () => {
	test('Map and Match performance', async () => {
		jest.setTimeout(60000)
		var suite = new Benchmark.Suite()
			.add('Functional primitives option', originalOptionArray)
			.add('fp-ts option', fpTsOptionArray)
			.on('cycle', function(event: any) {
				console.log(String(event.target));
			})
			.on('complete', function() {
				console.log('Fastest is ' + this.filter('fastest').map('name'));
			})
			.run({ async: true });
		
		while(suite.running)
		{
			await delay(2000);
		}
	});
});

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

const optionArrayLength = 1000;

function fpTsOptionArray() {
  const optionArray = [...Array(optionArrayLength).keys()].map(i => some({ name: 'foo', value: 'bar' }));
  const arr = optionArray.map(i => pipe(i, fold(() => ({ name: 'foo', value: 'bar' }), a => a)));
}

function originalOptionArray() {
  const myOptionArray = [...Array(optionArrayLength).keys()].map(i =>
    Option.some({ name: 'foo', value: 'bar' }),
  );

  const arr = myOptionArray.map(i =>
	i.map(x => x).map(x => x).map(x => x).match(
      some => some,
      () => ({ name: 'foo', value: 'bar' })
    )
  );
}