import * as express from 'express';
const router = express.Router();

import{ DisplayArtworkList, DisplayArtworkById, AddArtwork, UpdateArtwork, DeleteArtwork} from '../Controllers/artwork';

/* List of Routes (endpoints) */
/* GET Artwork List. */
router.get('/', (req, res, next) => { DisplayArtworkList(req, res, next);});

/*GET Artwork by ID */
router.get('/:id', (req, res, next) => { DisplayArtworkById(req, res, next); });

/* Add Artwork */
router.post('/add', (req, res, next) => { AddArtwork(req, res, next); });

/* Update Artwork */
router.put('/update/:id', (req, res, next) => { UpdateArtwork(req, res, next); });

/* Delete Artwork */
router.delete('/delete/:id', (req, res, next) => { DeleteArtwork(req, res, next); });

export default router;
