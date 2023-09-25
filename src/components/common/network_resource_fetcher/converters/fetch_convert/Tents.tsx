import { SUPPORT_METRICS_END_POINT } from '../../../EndPoint'
import FetchResult from '../../../Typing'
import { fetchArray } from '../../../network_resource_fetcher/FetchOrDefault'
import { FilterParametersNode } from '../../../store/multiset_container/sets/Interfaces'

export async function tentNamesToIDs(names: FilterParametersNode<string>): Promise<FetchResult<FilterParametersNode<string>>> {
    const tents: { [name: string]: string } = {
        'App Frameworks (UI, API, ORM)': '9CF2AC98-E331-446E-A0C4-C8E22A5CD32A',
        'ASP': '2028C5D4-37DA-48F2-A71D-15D2CAADCB2A',
        'Client Services': '187E2F1D-E60C-42ED-999C-59E99549EDFC',
        'Data Visualization and Analysis': '39CEA775-8FFC-4A74-89C8-566AC51838F0',
        'DevExpress': '1D44AA47-58B6-4064-99FE-A2B4513861DA',
        'DevExtreme': 'BFB220BD-1663-47A4-9483-D5EF4F8CB85E',
        'IDETeam': '0AFD2A04-71CB-4DD1-A537-7DA3B138C913',
        'Native Mobile': 'FF8F738D-EA74-4A64-AA23-A1422E718A27',
        'Office': '25E36EAD-8246-4A8C-BE18-C1441E8F6AD3',
        'Reports': 'B0FA769E-11DB-47A5-8613-88BA27295EF4',
        'TestCafe': '714E22FB-7621-4506-B0F6-14126B897F54',
        'VCL': '8BF622C3-6B5E-48A6-89E3-E54EBCB3904E',
        'WinForms Desktop UI': 'F0D19141-8EA0-4C30-987E-EF6C87D4BF5C',
        'XAML United Team': 'EB8A5B8D-3FD1-41AD-A907-D735603679F1',
    }
    return {
        success: true,
        data: {
            ...names,
            values: names.values.map(x => tents[x])
        }

    }
}
