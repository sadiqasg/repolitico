const fs = require('fs');
const parties = require('../models/parties.json');

// get all parties
exports.getParties = (req, res) => {
  if (parties.length > 0) {
    return res.json({ status: 200, data: parties});
  }
  return res.json({ status: 200, message: 'there are currently no parties available' });
};

// get single party
exports.getSingleParty = (req, res) => {
  let partyId = parseInt(req.params.id, 10);
  let findParty = parties.filter(p => p.id === partyId)[0];
  if (!findParty) return res.json({ status: 404, error: 'Party does not exist'});
  res.json({
    status: 200,
    data: {id: findParty.id, name: findParty.name, logoUrl: findParty.logoUrl},
  })
}

// posts new party
exports.postParty = (req, res) => {
  const newParty = {
    id: parties.length + 1,
    name: req.body.name,
    hqAddress: req.body.hqAddress,
    logoUrl: req.body.logoUrl,
  };

  if (!newParty.name || !newParty.hqAddress || !newParty.logoUrl) return res.json({status: 400, error: 'incomplete data'});
  
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

// edit party
exports.editParty = (req, res) => {
    const partyId = parseInt(req.params.id, 10);
    const findParty = parties.filter(p => p.id === partyId)[0];
    if (!findParty) {
      return res.json({ status: 404, error: 'party does not exist!' });
    }
    const index = parties.indexOf(findParty);
    const keys = Object.keys(req.body);
    keys.forEach((key) => {
      findParty[key] = req.body[key];
    });
    res.status(200).json({ status: 200, data: [{id: findParty.id, name: findParty.name}] });
}

// delete party
exports.deleteParty = (req, res) => {
  let partyId = parseInt(req.params.id, 10);
  console.log(partyId);
}
