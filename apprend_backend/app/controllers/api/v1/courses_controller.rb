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

  def new
    @course = Coruse.new
  end

  def create
    @course = Course.create(course_params)
    render json: @course
  end

private

  def course_params
    params.require(:course).permit(:title, :description, :time, :date, :img_url, :category_id, :location_id)
  end

end
