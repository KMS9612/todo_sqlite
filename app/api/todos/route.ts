import db from "../../../db/database";
import { NextResponse } from "next/server";

interface ITodo {
  id: number;
  tast: string;
  completed: boolean;
}

export async function GET() {
  return new Promise((resolve) => {
    db.all<ITodo[]>("SELECT * FROM todos", [], (err, rows) => {
      if (err) {
        return resolve(NextResponse.json({ error: err.message }));
      }
      resolve(NextResponse.json(rows));
      console.log("GET Success");
    });
  });
}

export async function POST(request: Request) {
  const { task } = await request.json();

  return new Promise((resolver) => {
    db.run(
      "INSERT INTO todos (task, completed) VALUES (?, ?)",
      [task, false],
      function (err) {
        if (err) {
          return resolver(
            NextResponse.json({ error: err.message }, { status: 500 })
          );
        }
        resolver(
          NextResponse.json(
            { id: this.lastID, task, completed: false },
            { status: 201 }
          )
        );
      }
    );
  });
}
