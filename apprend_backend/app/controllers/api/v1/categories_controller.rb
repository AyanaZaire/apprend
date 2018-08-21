class Api::V1::CategoriesController < ApplicationController

  def index
    @category = Category.all
    render json: @category
  end

  def show
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
