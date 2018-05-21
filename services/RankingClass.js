/**
 * {
    1: ['transport'],
    2: ['health', 'education']
}
 */

const _ = require('lodash');

class Ranking {
    constructor(ranks) {
        this.ranks = ranks;
        this.rankValues = {};
        this.utilityCoeff = {};
        this.criteriaCount = 0;
    }

    calculateRanks() {
        let length = 0;

        _.forEach(this.ranks, (value, key) => {
            this.rankValues[key] = length + (value.length + 1)/2;
            length += value.length;
        });

        this.criteriaCount = length;
    }

    calculateUtilityCoeff() {
        let sum = 0;
        _.forEach(this.rankValues, (value, key) => {
            this.utilityCoeff[key] = 1 - (value - 1)/this.criteriaCount;
            sum += this.utilityCoeff[key] * this.ranks[key].length;
        });

        _.forEach(this.utilityCoeff, (value, key) => {
            this.utilityCoeff[key] = value/sum;
        });
    }
}

module.exports = Ranking;