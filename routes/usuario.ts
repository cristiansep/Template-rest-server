import {Router} from 'express';
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, updateUsuario } from '../controllers/usuarios';


const router = Router();



router.get('/',       getUsuarios);
router.get('/:id',    getUsuario);
router.post('/',      postUsuario);
router.put('/:id',    updateUsuario);
router.delete('/:id', deleteUsuario);





export default router;