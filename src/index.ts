export * from "./Option";
export * from "./Result";
export * from "./Unit";

import { Option, some, none, option, isSome, fold, map } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/function'
import  {OptionFactory as NewOption } from './option/OptionFactory';

import  { some as HKTsome, none as HKTnone} from './option/HKToption/option';
const { performance } = require('perf_hooks');

var Benchmark = require('benchmark');

var suite = new Benchmark.Suite();

// add tests
suite
  .add('new Option', newOptionArray)
  .add('hkt option', hktOptionArray)
  .add('option', competitorOptionArray)
  .on('cycle', function(event: any) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });

function competitorOptionArray() {
  const optionArrayLength = 1000;

  const optionArray = [...Array(optionArrayLength).keys()].map(i => some({ name: 'foo', value: 'bar' }));
  
  const arr = optionArray.map(i => pipe(i, fold(() => ({ name: 'foo', value: 'bar' }), a => a)));
}

function newOptionArray() {
  const optionArrayLength = 1000;
  const myOptionArray = [...Array(optionArrayLength).keys()].map(i =>
    NewOption.some({ name: 'foo', value: 'bar' }),
  );

  type nameAndValue = {name:string, value: string}

  const arr : (nameAndValue[]) = myOptionArray.map(i => i.match(
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

  const arr = myOptionArray.map(i =>
    i.match(
      some => some,
      () => ({ name: 'foo', value: 'bar' }),
    ),
  );

  arr.map(i => i);
}

function roughSizeOfObject(object: any) {
  var objectList = [];
  var stack = [object];
  var bytes = 0;

  while (stack.length) {
    var value = stack.pop();

    if (typeof value === 'boolean') {
      bytes += 4;
    } else if (typeof value === 'string') {
      bytes += value.length * 2;
    } else if (typeof value === 'number') {
      bytes += 8;
    } else if (typeof value === 'object' && objectList.indexOf(value) === -1) {
      objectList.push(value);

      for (var i in value) {
        stack.push(value[i]);
      }
    }
  }
}