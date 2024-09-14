import db from "../../../db/database";
import { NextResponse } from "next/server";

interface ITodo {
  id: number;
  task: string; // 'tast'를 'task'로 수정
  completed: boolean;
}

export async function GET(): Promise<Response> {
  return new Promise((resolve) => {
    db.all<ITodo[]>("SELECT * FROM todos", [], (err, rows) => {
      if (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
      console.log("GET Success");
      resolve(NextResponse.json(rows));
    });
  });
}

export async function POST(request: Request): Promise<Response> {
  const { task } = await request.json();

  return new Promise((resolve) => {
    db.run(
      "INSERT INTO todos (task, completed) VALUES (?, ?)",
      [task, false],
      function (err) {
        if (err) {
          return resolve(
            NextResponse.json({ error: err.message }, { status: 500 })
          );
        }
        resolve(
          NextResponse.json(
            { id: this.lastID, task, completed: false },
            { status: 201 }
          )
        );
      }
    );
  });
}
