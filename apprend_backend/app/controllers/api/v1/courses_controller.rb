class Api::V1::CoursesController < ApplicationController

  def index
    render json: Course.all
  end

  def show
    @course = Course.find(params[:id])
    render json: @course
    # respond_to do |format|
    #   format.html { render :show }
    #   format.json { render json: @course.to_json(only: [:title, :description, :id],
    #     include: [category: {only: [:name]}, location: {only: [:city]} ]) }
    # end
  end

end
