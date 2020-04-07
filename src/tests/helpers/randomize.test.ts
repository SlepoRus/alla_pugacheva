import {randomizeStats} from "../../helpers/randomize";
import { times } from 'lodash';

describe('randomize', () => {
    describe('randomizeStats',  () => {
        times(100, (i: number) => {
            it('random test count ' + i, () => {
                const skillCount = 20;
                const obj = randomizeStats(skillCount);
                const sum = Object.keys(obj).reduce((acc, key) => {
                    acc += obj[key];

                    return acc;
                }, 0);

                expect(sum < skillCount).toBe(true);
            })
        })
    })
});
