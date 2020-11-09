extends Node2D

export(Color) var couleur
export(String) var arttribu
onready var case = $Polygon2D



# Called when the node enters the scene tree for the first time.
func _ready():
	case.color = couleur

func _reset_color():
	case.color = couleur
	
func _visite():
	case.color = Color("69c47b")
	
func _getColor():
	return case.color

func _bestRoute():
	case.color = Color("0000ff")
