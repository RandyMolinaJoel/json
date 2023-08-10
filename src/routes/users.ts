import express, {Request,Response } from 'express';
import userSchema, {User} from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const usersRouter = express.Router();

usersRouter.get('/' , async (req: Request, res: Response)=>{
    const userList = await User. find().select('name phone');
if(!userList){
    res.status(500).json({success:false})
}
res.status(200).send(userList);

});

usersRouter.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('The user not found');
    }
  
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const secret: string | undefined = "Randy";
      const token = jwt.sign(
        {
          userId: user._id,
          isAdmin: user.isAdmin,
        },
        secret!,
        { expiresIn: '1d' }
      );
      res.status(200).send({ user: user.email, token });
    } else {
      res.status(400).send('Invalid password');
    }
  });

  usersRouter.post('/register', async(req,res) =>{
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,"012345678910111213"),
        phone: req.body.isAdmin,
        street:req.body.street,
        apartament: req.body.apartament,
        zip:req.body.zip,
        city:req.body.city,

    }) 
    const addUser = await user.save();
    if(!addUser){
        return res.status(400).send('The user cannot be created!');

    }
    res.status(201).send(addUser);
  })
export default usersRouter;



