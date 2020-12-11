import Benchmark from 'benchmark';
import { some, fold } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/function'
import { OptionFactory } from '../src/option/OptionFactory';
import { Option as OptionV2 } from '../src/OptionV2/Option';
import { some as HKTsome, none as HKTnone} from '../src/option/HKToption/option';

describe('Performance Tests', () => {
	test('Map and Match performance', async () => {
		jest.setTimeout(60000)
		var suite = new Benchmark.Suite()
			.add('Original Option: Immutable with arrow functions', originalOptionArray)
			.add('fp-ts option', fpTsOptionArray)
			.add('HKT option', hktOptionArray)
			.add('Option V2: Class implementation, no arrow functions', optionV2Array)
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

function fpTsOptionArray() {
  const optionArrayLength = 1000;

  const optionArray = [...Array(optionArrayLength).keys()].map(i => some({ name: 'foo', value: 'bar' }));
  
  const arr = optionArray.map(i => pipe(i, fold(() => ({ name: 'foo', value: 'bar' }), a => a)));
}

function originalOptionArray() {
  const optionArrayLength = 1000;
  const myOptionArray = [...Array(optionArrayLength).keys()].map(i =>
    OptionFactory.some({ name: 'foo', value: 'bar' }),
  );

  type nameAndValue = {name:string, value: string}

  const arr : (nameAndValue[]) = myOptionArray.map(i =>
	i.map(x => x).map(x => x).map(x => x).match(
      some => some,
      () => ({ name: 'foo', value: 'bar' })
    )
  );
  arr.map(i => i);
}

function hktOptionArray() {
  const optionArrayLength = 1000;
  const myOptionArray = [...Array(optionArrayLength).keys()].map(i =>
    HKTsome({ name: 'foo', value: 'bar' }),
  );

  type nameAndValue = {name:string, value: string}

  const arr : (nameAndValue[]) = myOptionArray.map(i =>
    i.map(x => x).map(x => x).map(x => x).match(
      some => some,
      () => ({ name: 'foo', value: 'bar' }),
    ),
  );

  arr.map(i => i);
}

function optionV2Array() {
  const optionArrayLength = 1000;
  const myOptionArray = [...Array(optionArrayLength).keys()].map(i =>
    OptionV2.some({ name: 'foo', value: 'bar' }),
  );

  type nameAndValue = {name:string, value: string}

  const arr : (nameAndValue[]) = myOptionArray.map(i =>
	i.map(x => x).map(x => x).map(x => x).match(
      some => some,
      () => ({ name: 'foo', value: 'bar' })
    )
  );
  arr.map(i => i);
}