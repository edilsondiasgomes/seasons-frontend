export class ConvenienceUtils {

  public static findIcon(convenience: string): any {

    const size = " fa-xl"
    switch (convenience) {

      case 'wi-fi':
        return "fa-solid fa-wifi" + size

      case 'Internet':
        return "fa-solid fa-wifi" + size

      case 'Cozinha':
        return "fa-solid fa-utensils" + size

      case 'Estacionamento':
        return "fa-solid fa-car" + size

      case 'Ar-condicionado':
        return "fa-solid fa-snowflake" + size

      case 'Piscina':
        return "fa-solid fa-water-ladder" + size

      case 'Microondas':
        return "fa-solid fa-fire-burner" + size

      case 'Tv a cabo':
        return "fa-solid fa-tv" + size

      case 'Varanda':
        return "fa-solid fa-chair" + size

      case 'Ventilador':
        return "fa-solid fa-fan" + size

      case 'Banheira':
        return "fa-solid fa-bath" + size

      case 'Mesa de trabalho':
        return "fa-solid fa-inbox" + size

      case 'Próximo a praia':
        return "fa-solid fa-water" + size

      case 'Pets':
        return "fa-solid fa-cat" + size

      default:
        break;
    }
  }
}
