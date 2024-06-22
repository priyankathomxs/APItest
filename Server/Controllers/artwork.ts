import { Request, Response, NextFunction} from 'express';

import Artwork from '../Models/artwork';
import {SanitizeArray} from '../Util';

/**
 *This function displays the artwork list in JSON format
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayArtworkList(req: Request, res: Response, next: NextFunction): void
{
    Artwork.find({})
    .then(function(data)
    {
        res.status(200).json({success: true, msg: "Artwork List Retrieved and Displayed", data: data})
    })
    .catch((err) => {
        console.error(err);
    })
}

export function DisplayArtworkById(req: Request, res: Response, next: NextFunction) : void
{
    //endpoint should be /api:id
    let id = req.params.id;

    //ensure that the id is valid
    if(id.length != 24)
    {
        res.status(400).json({success: false, msg: "A valid ID is required to retrieve a Artwork", data: ""});
    }
    else
    {
        Artwork.findById({_id: id})
    .then((data) =>
    {
        if(data)
            {
                res.status(200).json({success: true, msg: "One Artwork Restrived and Displayed", data: data})
            }
            else
            {
                res.status(404).json({success: false, msg: "Artwork not found", data: ""});
            }
        
    })
    .catch((err) =>
     {
        console.error(err);
     })
    }
}
/**
 * This function adds an Artwork to the database
 * @param req 
 * @param res 
 * @param next 
 */
export function AddArtwork(req: Request, res:Response, next: NextFunction): void
{
    let style = (req.body.style)? SanitizeArray(req.body.style as string): SanitizeArray("");
    let subject = (req.body.subject)? SanitizeArray(req.body.subject as string): SanitizeArray("");
    

    let artwork = new Artwork({
        artworkID: req.body.artworkID, 
        title: req.body.title,
        artist: req.body.artist, 
        medium: req.body.medium,
        subject: subject,
        yearCreated: req.body.yearCreated,
        description: req.body.description,
        dimensions: req.body.dimensions, 
        imageURL: req.body.imageURL,
        style: style,
        currenLocation: req.body.currenLocation
    });

    Artwork.create(artwork)
    .then(() =>
    {
        res.status(200).json({success: true, msg: "Artwork Added", data: artwork});
    })
    .catch((err) =>
       {
        console.error(err);
       })

}

/**
 * The function updates the database in the artwork
 * @param req 
 * @param res 
 * @param next 
 */
export function UpdateArtwork(req: Request, res:Response, next: NextFunction): void
{
    //endpoint should be /api/update/:id
    let id = req.params.id;

    //ensure that the id is valid
    if(id.length != 24)
    {
        res.status(400).json({success: false, msg: "A valid ID is required to update a artwork", data: ""});
    } 
    else
    {
     let style = (req.body.style)? SanitizeArray(req.body.style as string): SanitizeArray("");
    let subject = (req.body.subject)? SanitizeArray(req.body.subject as string): SanitizeArray("");
        

    let artworkToUpdate = new Artwork({
        artworkID: req.body.artworkID, 
        title: req.body.title,
        artist: req.body.artist, 
        medium: req.body.medium,
        subject: subject,
        yearCreated: req.body.yearCreated,
        description: req.body.description,
        dimensions: req.body.dimensions, 
        imageURL: req.body.imageURL,
        style: style,
        currenLocation: req.body.currenLocation
    });

    Artwork.updateOne({_id: id}, artworkToUpdate)
    .then(() =>
    {
        res.status(200).json({success: true, msg: "Artwork Updated", data: artworkToUpdate});
    })
    .catch((err) =>
       {
        console.error(err);
       })
    }
}

/**
 * The function deletes a artwork from the database
 * @param req 
 * @param res 
 * @param next 
 */
export function DeleteArtwork(req: Request, res:Response, next: NextFunction): void
{
    //endpoint should be /api/delete/:id
    let id = req.params.id;

    //ensure that the id is valid
    if(id.length != 24)
    {
        res.status(400).json({success: false, msg: "A valid ID is required to update a artwork", data: ""});
    } 
    else
    {
    Artwork.deleteOne({_id: id})
    .then(() =>
    {
        res.status(200).json({success: true, msg: "Artwork deleted", data: id});
    })
    .catch((err) =>
       {
        console.error(err);
       })
    }
}