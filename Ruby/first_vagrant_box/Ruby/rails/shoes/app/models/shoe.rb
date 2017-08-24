
class Shoe < ActiveRecord::Base
  belongs_to :seller, class_name: "User", foreign_key: :user_id
  belongs_to :buyer, class_name: "User", foreign_key: :buyer_id

  validates :name, presence: true, length: { in: 2..20 }
  validates :price, presence: true

end
