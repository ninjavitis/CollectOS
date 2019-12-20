# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_20_204009) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "collectibles", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "ctype_id"
    t.bigint "clicks"
    t.bigint "level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "clicksToLevel"
    t.index ["ctype_id"], name: "index_collectibles_on_ctype_id"
    t.index ["user_id"], name: "index_collectibles_on_user_id"
  end

  create_table "ctypes", force: :cascade do |t|
    t.string "name"
    t.string "desc"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "mooses", force: :cascade do |t|
    t.string "type"
    t.string "subtype"
    t.bigint "clicks"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "variant"
    t.boolean "magic"
    t.integer "age"
    t.bigint "clicksToLevel"
    t.bigint "level"
    t.index ["user_id"], name: "index_mooses_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "mooseclicks"
    t.datetime "lastclick"
    t.bigint "remainingClicks"
    t.bigint "points"
    t.bigint "activeMoose"
    t.bigint "activeCollectible"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "collectibles", "ctypes"
  add_foreign_key "collectibles", "users"
  add_foreign_key "mooses", "users"
end
