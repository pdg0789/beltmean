class AddLikeToIdeas < ActiveRecord::Migration
  def change
    add_reference :ideas, :like, index: true, foreign_key: true
  end
end
