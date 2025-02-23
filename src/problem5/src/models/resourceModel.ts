import db from '../db';

export interface Resource {
  id: number;
  name: string;
  description: string;
}

export const createResource = (name: string, description: string): Promise<Resource> => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO resources (name, description) VALUES (?, ?)';
    db.run(sql, [name, description], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, name, description });
      }
    });
  });
};

export const getAllResources = (filters: { name?: string }): Promise<Resource[]> => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM resources';
    const params: any[] = [];

    if (filters.name) {
      sql += ' WHERE name LIKE ?';
      params.push(`%${filters.name}%`);
    }

    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows as Resource[]); 
      }
    });
  });
};

export const getResourceById = (id: number): Promise<Resource | null> => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM resources WHERE id = ?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row as Resource || null);
      }
    });
  });
};

export const updateResource = (id: number, name: string, description: string): Promise<Resource> => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE resources SET name = ?, description = ? WHERE id = ?';
    db.run(sql, [name, description, id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id, name, description });
      }
    });
  });
};

export const deleteResource = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM resources WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
