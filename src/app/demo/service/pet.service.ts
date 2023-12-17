import { Injectable } from '@angular/core';
import { Pet } from '../api/pet.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PetService {

    private basePath = "products"

    constructor(private db: AngularFireDatabase) { }

    // Criar um produto
    createPet(pet: Pet): any {
        return this.db.list<Pet>(this.basePath).push(pet);
    }

    getPets(): Observable<Pet[]> {
        return this.db.list<Pet>(this.basePath).snapshotChanges().pipe(
            map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
        );
    }

    // Obter um produto por ID
    getPetId(key: string): Observable<Pet | null> {
        return this.db.object<Pet>(`${this.basePath}/${key}`).valueChanges();
    }

    // Atualizar um produto
    updatePet(key: string, updatedProduct: Pet): Promise<void> {
        return this.db.object<Pet>(`${this.basePath}/${key}`).update(updatedProduct);
    }

    // Excluir um produto
    deletePet(key: string): Promise<void> {
        return this.db.object<Pet>(`${this.basePath}/${key}`).remove();
    }
}
