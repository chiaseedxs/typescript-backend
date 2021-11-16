import {Request, Response, NextFunction} from 'express';
import { get, controller, use } from './decorators'


function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return
  }
  res.status(403);
  res.send('not permitted')
}

@controller('')
class RootContoller {
@get('/')
getRoot(req: Request, res: Response)  {
  if (req.session && req.session.loggedIn) {
    res.send(`
    <div>
    <div>YOU ARE LOGGED IN</div>
    <a href="/auth/logout">Logout</a>
    </div>
    `)
  } else {
    res.send(`
    <div>
    <div> you are not logged in</div>
    <a href="/auth/login">Login</a>
    <div>`)
  }
}

@get('/Protected')
@use(requireAuth)
getProtectd (req: Request, res: Response)  {
  res.send('Welcome to protected route')
}

}