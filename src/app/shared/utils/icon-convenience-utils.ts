export class ConvenienceUtils {

  public static findIcon(convenience: string): any {

    switch (convenience) {

      case 'wi-fi':
        return "fa-solid fa-wifi"

      case 'Cozinha':
        return "fa-solid fa-utensils"

      case 'Estacionamento':
        return "fa-solid fa-car"

      case 'Ar-condicionado':
        return "fa-solid fa-snowflake"

      case 'Piscina':
        return "fa-solid fa-water-ladder"

      case 'Microondas':
        return "fa-solid fa-fire-burner"

      case 'Tv a cabo':
        return "fa-solid fa-tv"

      case 'Varanda':
        return "fa-solid fa-chair"

      case 'Ventilador':
        return "fa-solid fa-fan"

      case 'Banheira':
        return "fa-solid fa-bath"

      case 'Mesa de trabalho':
        return "fa-solid fa-inbox"

      case 'Próximo a praia':
        return "fa-solid fa-water"

      case 'Pets':
        return "fa-solid fa-cat"

      default:
        break;
    }
  }
}
