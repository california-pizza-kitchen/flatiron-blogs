class SemestersController < ApplicationController

  def index

  end

  def show
    @slug = params[:slug]
  end

end
