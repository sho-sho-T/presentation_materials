// ORM 「Data Mapper」
// ドメインオブジェクトと永続化を分離
// ex: 
// JPA,Jibernate: JAVA
// Prisma: TypeScript,JavaScript 方安全、スキーマファースト
// Sequelize: Node.js
// Entity Framework: C#

// Prisma例
// schema.prisma

model User {
    id String @id @default(cuid())
    name String
    email String @unique
};

// ドメインエンティティ（分離）
class UserEntity {
    constructor(private name: string, private email: string) {}

    sendWelcomeEmail() { // ビジネスロジック
        // ドメインロジック
    }
};

// 永続化(分離)
class UserRepository {
    async save(user: UserEntity) {
        await prisma.user.create({ data: user.toData() }); 
    }
};