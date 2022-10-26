const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const User = require('../models/User');

const { protect } = require('../middleware/authMiddleware');

//Find Single Group by Name and Join if joinCode matches
router.post('/joinGroup', protect, async (req, res) => {
  const groupName = req.body.groupName;
  const joinCode = req.body.joinCode;
  const userID = req.user._id;
  // console.log('userID', userID);
  // console.log('group', groupName);
  // console.log('code', joinCode);
  const group = await Group.findOne({ groupName: groupName });
  const user = await User.findById(userID);
  if (group && user) {
    if (group.joinCode === joinCode) {
      try {
        await user.updateOne({
          group: group._id,
        });

        let copyUsers = [...group.groupUsers];
        copyUsers.push(user._id);
        await group.updateOne({ groupUsers: copyUsers });
        return res.status(200).json({
          message:
            'Successfully added ' +
            user.user +
            ' to ' +
            group.groupName +
            ' group!',
        });
      } catch {
        return res
          .status(400)
          .json({ message: 'Group not joined, check Group Name or Join Code' });
      }
    }
  }
  return res
    .status(400)
    .json({ message: 'Group not joined, check Group Name or Join Code' });
});

//Leave Group
router.post('/leave', protect, async (req, res) => {
  // const groupName = req.body.groupName;
  // const joinCode = req.body.joinCode;
  // const userID = req.user._id;
  const group = await Group.findById(req.user.group._id);
  const user = await User.findById(req.user._id);

  if (group && user) {
    await user.updateOne({
      group: null,
    });

    let copyUsers = [...group.groupUsers];
    copyUsers.splice(copyUsers.indexOf(req.user._id), 1);
    await group.updateOne({ groupUsers: copyUsers });
    return res.status(200).json({
      message:
        'Successfully removed ' +
        user.user +
        ' from ' +
        group.groupName +
        ' group',
    });
  } else {
    return res
      .status(400)
      .json({ message: 'Group not joined, check groupName or joinCode' });
  }
});

//Create New Group or return message if Group with same name already exists
router.post('/newGroup', async (req, res) => {
  console.log('req', req.body);
  const groupName = req.body.groupName.toLowerCase();
  const joinCode = req.body.joinCode;
  const findGroup = await Group.findOne({ groupName: groupName });

  if (findGroup) {
    return res.status(400).json({
      message:
        'Group name already exists! Try a different name or join existing group',
    });
  } else {
    const newGroup = new Group({
      groupName: groupName,
      joinCode: joinCode,
    });
    await newGroup.save();
    return res.status(200).json({
      message: newGroup.groupName + ' group created',
    });
  }
});

module.exports = router;
