class User < ActiveRecord::Base
  has_secure_password
  before_save :down_fields

  has_many :ideas, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :ideas_liked, through: :likes, source: :ideas

  validates :name, :alias, presence: true, length: 2..30
  validates_format_of :name, :alias, with: /\A[-a-z]+\Z/i
  validates :password, on: :create, length: { minimum: 8 }
  validates :email, presence: true, uniqueness: true
  validates_format_of :email, with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/

  def downcase_fields
        self.name.downcase!
        self.alias.downcase!
        self.email.downcase!
  end
end
