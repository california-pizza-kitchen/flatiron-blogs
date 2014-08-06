class SemestersController < ApplicationController

  def show
    @slug = params[:slug]
  end

end
