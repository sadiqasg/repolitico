const fs = require('fs');
const parties = require('../models/parties.json');

exports.getParties = (req, res) => {
  if (parties.length > 0) {
    return res.json({ status: 200, data: parties});
  }
  return res.json({ status: 200, message: 'there are currently no parties available' });
};

exports.postParty = (req, res) => {
  const newParty = {
    id: parties.length + 1,
    name: 'newest party',
    hqAddress: 'some address',
    logoUrl: 'some url',
  };
  let duplicate = parties.filter(p => p.name.toLowerCase() === newParty.name.toLowerCase());
  if (duplicate.length === 0) {
    parties.push(newParty);
    fs.writeFileSync('./models/parties.json', JSON.stringify(parties));
    res.json({
        status: 201,
        data: {id: newParty.id, name: newParty.name}
    });
  } else {
      res.json({
          status: 400,
          error: 'Party already exists',
      });
  }
};

exports.editParty = (req, res) => {
  
}