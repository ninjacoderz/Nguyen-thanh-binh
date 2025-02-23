import { Router } from 'express';
import * as resourceController from '../controllers/resourceController';

const router = Router();

router.post('/', resourceController.createResource);
router.get('/', resourceController.getAllResources);
router.get('/:id', resourceController.getResourceById);
router.put('/:id', resourceController.updateResource);
router.delete('/:id', resourceController.deleteResource);

export default router;
