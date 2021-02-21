import { Request, Response } from "express";
import Usuario from "../models/usuario";


export const getUsuarios = async(req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();
    res.json({
        usuarios
    })

}


export const getUsuario = async(req: Request, res: Response) => {

    const {id} = req.params;

    const usuario = await Usuario.findByPk(id);

    if(!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con ese Id'
        })
    }

    res.json({
        usuario
    })

}


export const postUsuario = async(req: Request, res: Response) => {

    const {body} = req;
    try {


        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });


        if(existeEmail) {
            return res.status(400).json({
                msg: 'ya existe un usuario con ese email'
            });
        }


        const usuario = new Usuario(body);
        await usuario.save();


        res.json(usuario);

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
        msg: 'Hable con el administrador'
    })
    }

    

}



export const updateUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con ese Id'
            });
        }

        await usuario.update(body);
        res.json(usuario);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}


export const deleteUsuario = async(req: Request, res: Response) => {

    const {id} = req.params;

    try {

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con ese Id'
            });
        }


        // forma logica: solo cambiar el estado para no eliminar referencias
        await usuario.update({estado: false});

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}