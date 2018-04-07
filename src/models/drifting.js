import { queryDb } from '../services/mysql';

export async function createDrifting(user_id, isbn, content) {
  // const sql = `
  //   INSERT
  //   INTO drifting(user_id, isbn, content)
  //     SELECT
  //       user_id,
  //       isbn,
  //       ? AS content
  //     FROM
  //       book AS B
  //     WHERE
  //       B.user_id = ?
  //       AND B.isbn = ?
  //   ;
  // `;
  /**
   * Edit by 吴博文
   */
  const sql = `
    INSERT
    INTO drifting(user_id, isbn, content)
      SELECT
        ? AS user_id,
        isbn,
        ? AS content
      FROM
        book_info AS B
      WHERE
        B.isbn = ?
    ;
  `;
  return queryDb(sql, [user_id, content, isbn]);
}

export async function updateContent(drifting_id, user_id, content) {
  const sql = `
    UPDATE drifting
    SET content = ?
    WHERE drifting_id = ?
      AND user_id = ?
    ;
  `;
  return queryDb(sql, [content, drifting_id, user_id]);
}

export async function removeDrifting(drifting_id, user_id) {
  const sql = `
    DELETE
    FROM drifting
    WHERE drifting_id = ?
      AND user_id = ?
    ;
  `;
  return queryDb(sql, [drifting_id, user_id]);
}

export async function retrieveDriftingByUserId(user_id) {
  const sql = `
    SELECT
      *
    FROM drifting
    WHERE user_id = ?
    ORDER BY create_at DESC
    ;
  `;
  return queryDb(sql, [user_id]);
}

export async function retrieveDriftingByISBN(isbn) {
  const sql = `
    SELECT
      *
    FROM drifting
    WHERE isbn = ?
    ORDER BY create_at DESC
    ;
  `;
  return queryDb(sql, [isbn]);
}


export async function retrieveDriftingById(drifting_id) {
  const sql = `
    SELECT
      *
    FROM drifting
    WHERE drifting_id = ?
    ;
  `;
  return queryDb(sql, [drifting_id]);
}

/**
 * 获取所有的漂流信息
 * 按需加载应该怎么做？
 */
export async function retrieveAllDrifting() {
  const sql = `
    SELECT
      book_info.*,
      drifting.drifting_id,
      drifting.content,
      user.nick_name,
      user.avator_url
    FROM
      (drifting LEFT JOIN book_info
      ON drifting.isbn = book_info.isbn)
        LEFT JOIN user
        ON drifting.user_id = user.user_id
    ORDER BY drifting.create_at DESC
    ;
  `;
  return queryDb(sql, []);
}