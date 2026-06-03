const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data', 'medseat-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

data.colleges = data.colleges.map(college => {
  // Add university
  college.university = college.stateSlug === 'delhi' ? 'Delhi University' : 'State Health University';
  
  // Add seatMatrix
  college.seatMatrix = {
    aiq: Math.floor(college.seatCount * 0.15),
    stateQuota: Math.floor(college.seatCount * 0.85),
    management: college.collegeType === 'private' ? Math.floor(college.seatCount * 0.2) : 0,
    nri: college.collegeType === 'private' ? Math.floor(college.seatCount * 0.15) : 0,
    categoryDistribution: {
      "General": Math.floor(college.seatCount * 0.4),
      "OBC": Math.floor(college.seatCount * 0.27),
      "SC": Math.floor(college.seatCount * 0.15),
      "ST": Math.floor(college.seatCount * 0.075)
    }
  };
  
  // Add otherInfo
  college.otherInfo = {
    officialWebsite: `https://www.${college.slug}.edu.in`,
    counsellingBrochureUrl: `https://www.${college.slug}.edu.in/brochure.pdf`
  };
  
  // Update cutoffs
  const newCutoffs = [];
  college.cutoffs.forEach(cutoff => {
    // Round 1
    newCutoffs.push({
      year: cutoff.year,
      round: "Round 1",
      category: "General",
      quota: cutoff.quota,
      openingRank: Math.floor(cutoff.rank * 0.7),
      closingRank: cutoff.rank
    });
    // Add OBC category for the same year as an example of category-wise
    newCutoffs.push({
      year: cutoff.year,
      round: "Round 1",
      category: "OBC",
      quota: cutoff.quota,
      openingRank: Math.floor(cutoff.rank * 0.9),
      closingRank: Math.floor(cutoff.rank * 1.2)
    });
    // Add Round 2
    newCutoffs.push({
      year: cutoff.year,
      round: "Round 2",
      category: "General",
      quota: cutoff.quota,
      openingRank: cutoff.rank,
      closingRank: Math.floor(cutoff.rank * 1.1)
    });
  });
  college.cutoffs = newCutoffs;
  
  // Remove infrastructure and reviews
  delete college.infrastructure;
  delete college.reviews;
  
  return college;
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Data updated successfully!');
