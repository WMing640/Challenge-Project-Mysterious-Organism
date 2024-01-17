// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randomIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA(otherOrg) {
      let similarBase = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherOrg.dna[i]) {
          similarBase++;
        }
      }
      const similaritypercent = (similarBase / this.dna.length) * 100;
      return `Specimen #${this.specimenNum} and #${otherOrg.specimenNum} have ${similaritypercent}% DNA in common.`;
    },
    willLikelySurvive() {
      const countCG = this.dna.filter(base => base === 'C' || base === 'G');
      return (countCG.length / this.dna.length) >= 0.6;
    },
  };
};

const pAequorInstances = [];

for (let i = 1; i <= 30; i++) {
  const organism = pAequorFactory(i, mockUpStrand());

  while (!organism.willLikelySurvive()) {
    organism.mutate();
  }

  pAequorInstances.push(organism);
}

console.log(pAequorInstances);
