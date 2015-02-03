class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.text :body
      t.integer :list_id

      t.timestamps null: false
    end
  end
end
