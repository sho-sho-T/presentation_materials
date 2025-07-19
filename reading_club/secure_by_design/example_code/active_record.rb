# Active Record
# オブジェクト自体がデータベースレコードであり、同時にビジネスロジックも持つ

# ex.
# Rails Active Record: Ruby
# Laravel Eloquent: PHP
# Django ORM Python

class User < ApplicationRecord
    validates :name, presence: true

    def full_name # ビジネスロジックもここに
        "#{first_name} #{last_name}"
    end

    def send_welcome_email # ドメインロジック
        UserMailer.welcome(self).deliver.now
    end
end

# 使用例
user = User.create(name: "田中太郎") # 永続化
user.send_welcome_email #ビジネスロジック