const Member = require('./models/Member');

// Function to handle GET request for all members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to handle GET request for a specific member by MemberID
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to handle POST request to create a new member
exports.createMember = async (req, res) => {
  const member = new Member({
    MemberID: req.body.MemberID,
    Name: req.body.Name,
    Address: req.body.Address,
    Email: req.body.Email,
    Phone: req.body.Phone,
    RegistrationDate: req.body.RegistrationDate
  });

  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to handle DELETE request to delete a member by MemberID
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    await member.remove();
    res.json({ message: 'Member deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
